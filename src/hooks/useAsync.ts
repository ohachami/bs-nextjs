type AsyncFunction<T> = () => Promise<T>;

export async function callAsync<T>(asyncFunction: AsyncFunction<T>) {
    try {
      const response = await asyncFunction();
      return response;
    } catch (error) {
        console.error(error);
      throw error;
    } finally {
      
    }
}