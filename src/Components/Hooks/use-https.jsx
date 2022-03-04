import { useCallback, useState } from "react";
// react custom hook ( use for send requst http api ...)
const useHttps = () => {
    // state manage for loading
    const [isLoading, setIsLoading] = useState(false);
    // state manage for handle error
    const [error, setError] = useState(null);

    const secndRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true);
        setError(null);
        // handle eror for not crash app
        try {
            // send request width enter info
            const response = await fetch(requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : "GET",
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
            });
            // throw error when failding request
            if (!response.ok) {
                throw new Error("request Faild !");
            }
            // storage data as json
            const data = await response.json();
            applyData(data);
        } catch (error) {
            // set state for manageing text error
            setError(error.message || "Somthing wrong ! ");
        }
        setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        secndRequest,
    };
};
export default useHttps;
