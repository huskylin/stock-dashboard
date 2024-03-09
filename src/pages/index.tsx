import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const { stockCode } = router.query;
  useEffect(() => {
    if (!stockCode) {
      router.push('/404');
    }
  }, [stockCode, router]);
}
