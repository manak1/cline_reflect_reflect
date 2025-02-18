/** KPTの個別アイテムを表す型 */
export interface KptItem {
  /** アイテムの一意識別子 */
  id: string;
  /** アイテムの内容 */
  content: string;
  /** アイテムの作成日時（ISO 8601形式） */
  createdAt: string;
}

/** KPTの全アイテムを分類ごとにまとめた型 */
export interface KptItems {
  /** Keepカテゴリのアイテム配列 */
  keep: KptItem[];
  /** Problemカテゴリのアイテム配列 */
  problem: KptItem[];
  /** Tryカテゴリのアイテム配列 */
  try: KptItem[];
}

/** 週の情報を表す型 */
export interface WeekInfo {
  /** 週の開始日 */
  startDate: Date;
  /** 週の終了日 */
  endDate: Date;
  /** 年間通算の週番号 */
  weekNumber: number;
}

/** KPTの分類を表すユニオン型（'keep' | 'problem' | 'try'） */
export type KptType = keyof KptItems;