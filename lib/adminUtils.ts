import axios from "axios";

export async function deleteThread(id: string) {
  await axios.delete(`/api/threads/${id}`);
}
