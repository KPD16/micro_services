import axios, { Axios, AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

class ApiService  {
   instance: AxiosInstance
   constructor() {
      this.instance = axios.create({});
      this.instance.interceptors.request.use(this.requestInterceptor);
      this.instance.interceptors.response.use(this.responseInterceptor, this.responseErrorHandler);
   }

   private async requestInterceptor(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {

      // if (config.url?.includes('refresh-token')) {

      //     return config;
      // }

      if (config.url?.includes('tenor.googleapis.com')) {

          return config;
      }

      const token = localStorage.getItem("token");

      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
  }

  private responseInterceptor(response: AxiosResponse): AxiosResponse {
      if(response.config.url?.includes("/auth/api/v1")) {
         localStorage.setItem('token', response.data.token)
      }
      return response;
  }

  private async responseErrorHandler(error: AxiosError): Promise<any> {
   const originalRequest = error.config as InternalAxiosRequestConfig;


   // if (error?.response?.status === 401 && !originalRequest?._retry) {
   //     console.log('Request Failed', 'Unauthorised');
   //     originalRequest._retry = true;

   //     const newToken: string = await MeetingModule.getNewToken();

   //     if (newToken) {

   //         const tokenType = await MeetingModule.getTokenType();

   //         if (tokenType === 'sdk') {
   //             originalRequest.headers['X-DVC-Tenant-SDK-Key'] = newToken;
   //         } else {
   //             originalRequest.headers.Authorization = `Bearer ${newToken}`;
   //         }

   //         console.log('Retrying Request ......');

   //         return this.instance.request(originalRequest);
   //     }
   // }

   return Promise.reject(error);
}

   async request<T = any, R = AxiosResponse<T, any>, D = any>(config: AxiosRequestConfig<D>): Promise<R> {
      const newConfig ={
         headers:{
            'Content-Type': 'application/json'
         },
         ...config
      }
      try {
         // Make the request and return the response
         return await this.instance.request(newConfig);
      } catch (error) {
         // Handle and display the error
         if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            console.error('Axios error:', error);
            // You can also access error.response if needed
         } else {
            // Handle non-Axios errors
            console.error('Error:', error);
         }
         // Optionally, rethrow the error if you want to propagate it
         throw error;
      }
   }
}

const apiService = new ApiService();
export default apiService;
