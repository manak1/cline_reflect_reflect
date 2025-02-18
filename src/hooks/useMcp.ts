import { useState } from 'react';
import { use_mcp_tool } from '@modelcontextprotocol/sdk';

export function useMcpTool(serverName: string, toolName: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeTool = async <T extends Record<string, unknown>>(args: T) => {
    setLoading(true);
    setError(null);

    try {
      const result = await use_mcp_tool(serverName, toolName, args);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    execute: executeTool,
    loading,
    error,
  };
}