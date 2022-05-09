import { toastController } from "@ionic/core/components";
export async function toast(message: any) {
  const toast = await toastController.create({
    color: "dark",
    duration: 2000,
    message: `${message}`,
  });

  await toast.present();
}
