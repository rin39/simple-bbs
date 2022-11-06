import axios from "axios";

export async function deleteThread(id: string) {
  await axios.delete(`/api/threads/${id}`);
}

export async function deleteMessage(id: string) {
  await axios.delete(`/api/messages/${id}`);
}
