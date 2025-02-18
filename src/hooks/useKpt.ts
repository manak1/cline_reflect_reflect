import { useEffect, useState } from "react";
import type { KptItems, KptType, WeekInfo } from "../types/kpt";
import { supabase } from "../lib/supabase";
import { useAuth } from "./useAuth";
import { getKptFeedback } from "../lib/gemini";
import {
  getCurrentWeekInfo,
  getNextWeek,
  getPreviousWeek,
  isInWeek,
} from "../lib/date-utils";

/**
 * KPTボードの状態管理と操作を提供するカスタムフック
 * 
 * @returns {Object} KPTの状態と操作メソッド
 * @property {KptItems} items - 現在の週のKPTアイテム
 * @property {boolean} loading - データ読み込み中かどうか
 * @property {Function} handleAddItem - KPTアイテムを追加する関数
 * @property {Function} handleDeleteItem - KPTアイテムを削除する関数
 * @property {Function} handleMoveItem - KPTアイテムを別のカテゴリに移動する関数
 * @property {string | null} feedback - AIフィードバックの内容
 * @property {boolean} feedbackLoading - フィードバック取得中かどうか
 * @property {string | null} feedbackError - フィードバック取得時のエラー
 * @property {Function} getFeedback - AIフィードバックを取得する関数
 * @property {WeekInfo} currentWeek - 現在表示中の週の情報
 * @property {Function} goToNextWeek - 次の週に移動する関数
 * @property {Function} goToPreviousWeek - 前の週に移動する関数
 * 
 * @example
 * const {
 *   items,
 *   handleAddItem,
 *   currentWeek,
 *   goToNextWeek,
 *   getFeedback,
 * } = useKpt();
 * 
 * // KPTアイテムを追加
 * handleAddItem('keep')('新しい成果');
 * 
 * // 次の週に移動
 * goToNextWeek();
 * 
 * // AIフィードバックを取得
 * getFeedback();
 */
export function useKpt() {
  const { user } = useAuth();
  const [currentWeek, setCurrentWeek] = useState<WeekInfo>(getCurrentWeekInfo());
  const [items, setItems] = useState<KptItems>({
    keep: [],
    problem: [],
    try: [],
  });
  const [loading, setLoading] = useState(true);

  const goToNextWeek = () => {
    setCurrentWeek(getNextWeek(currentWeek));
  };

  const goToPreviousWeek = () => {
    setCurrentWeek(getPreviousWeek(currentWeek));
  };

  useEffect(() => {
    if (!user) {
      setItems({ keep: [], problem: [], try: [] });
      setLoading(false);
      return;
    }

    const loadKptItems = async () => {
      try {
        const { data, error } = await supabase
          .from('reflect_reflect')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true });

        if (error) throw error;

        const groupedItems = data.reduce<KptItems>((acc, item) => {
          if (isInWeek(new Date(item.created_at), currentWeek)) {
            acc[item.type as KptType].push({
              id: item.id,
              content: item.content,
              createdAt: item.created_at,
            });
          }
          return acc;
        }, { keep: [], problem: [], try: [] });

        setItems(groupedItems);
      } catch (error) {
        console.error('Error loading KPT items:', error);
      } finally {
        setLoading(false);
      }
    };

    loadKptItems();
  }, [user, currentWeek]);

  const handleAddItem = (type: KptType) => async (content: string) => {
    if (!user) return;

    const now = new Date().toISOString();

    try {
      const { data, error } = await supabase
        .from('reflect_reflect')
        .insert([
          {
            user_id: user.id,
            type,
            content,
            created_at: now,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      if (isInWeek(new Date(data.created_at), currentWeek)) {
        setItems((prev) => ({
          ...prev,
          [type]: [
            ...prev[type],
            { id: data.id, content: data.content, createdAt: data.created_at },
          ],
        }));
      }
    } catch (error) {
      console.error('Error adding KPT item:', error);
    }
  };

  const handleDeleteItem = (type: KptType) => async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('reflect_reflect')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setItems((prev) => ({
        ...prev,
        [type]: prev[type].filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting KPT item:', error);
    }
  };

  const handleMoveItem = async (
    itemId: string,
    fromType: KptType,
    toType: KptType,
  ) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('reflect_reflect')
        .update({ type: toType })
        .eq('id', itemId)
        .eq('user_id', user.id);

      if (error) throw error;

      setItems((prev) => {
        const item = prev[fromType].find((item) => item.id === itemId);
        if (!item) return prev;

        return {
          ...prev,
          [fromType]: prev[fromType].filter((item) => item.id !== itemId),
          [toType]: [...prev[toType], item],
        };
      });
    } catch (error) {
      console.error('Error moving KPT item:', error);
    }
  };

  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  const getFeedback = async () => {
    setFeedbackLoading(true);
    setFeedbackError(null);
    try {
      const kptContents = {
        keep: items.keep.map(item => item.content),
        problem: items.problem.map(item => item.content),
        try: items.try.map(item => item.content),
      };

      const result = await getKptFeedback(kptContents);
      setFeedback(result);
    } catch (error) {
      setFeedbackError(error instanceof Error ? error.message : '不明なエラーが発生しました');
      console.error('Error getting KPT feedback:', error);
    } finally {
      setFeedbackLoading(false);
    }
  };

  return {
    items,
    loading,
    handleAddItem,
    handleDeleteItem,
    handleMoveItem,
    feedback,
    feedbackLoading,
    feedbackError,
    getFeedback,
    currentWeek,
    goToNextWeek,
    goToPreviousWeek,
  };
}