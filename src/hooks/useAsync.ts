import { toast } from "./use-toast";

type AsyncFunction<T> = () => Promise<T>;

export async function callAsync<T>(asyncFunction: AsyncFunction<T>) {
  try {
    const response = await asyncFunction();
    return response;
  } catch (error: unknown) {
    toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: error.message,
      duration: 5000
    });
    console.error(error)
    throw error;
  } finally {
  }
}
