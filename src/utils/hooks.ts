import { useState } from 'react';
import { useAsync, useToggle } from 'react-use';
import { jsonRequest } from './request';

export function useRequest<T = any>(url: string, body: Record<string, any>) {
  const [data, setData] = useState<T>(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState('');
  const [refreshFlag, refresh] = useToggle(false);
  useAsync(async () => {
    setFailed('');
    setLoading(true);
    try {
      const resp = await jsonRequest('find/replay/by_ratotal_aid', body);
      setData(resp);
    } catch (err) {
      setFailed(err.message)
    } finally {
      setLoading(false)
    }
  }, [refreshFlag]);
  return [data, loading, failed, refresh] as const;
}
