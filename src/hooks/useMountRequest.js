import { useEffect, useState } from "react";

/**
 *
 * @param {Function}
 * @param {Any=[]} defaultData
 * @returns {Array<Any,boolean>}
 */
function useMountRequest(requestFunction, defaultData = []) {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await requestFunction();
      if (response.status === 200) {
        setData(response.data);
        setLoading(false);
      }
    }
    fetchData();
  }, [requestFunction]);

  return [data, loading];
}

export default useMountRequest;
