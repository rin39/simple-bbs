import { useRouter } from "next/router";
import { deleteThread, deleteMessage } from "../lib/adminUtils";

export default function useAdminUtils() {
  const router = useRouter();
  return {
    deleteThread: async (threadId: string) => {
      await deleteThread(threadId);
      router.back();
    },
    deleteMessage: async (messageId: string) => {
      await deleteMessage(messageId);
      router.replace(router.asPath, undefined, { scroll: false });
    },
  };
}
