import { useCallback, useEffect, useState } from "react";
import { Filesystem, Directory, WriteFileResult } from "@capacitor/filesystem";
import { FileOpener } from "@capacitor-community/file-opener";
import { convertBlobToBase64 } from "../utils/helpers";
import { Payslip, getPayslip } from "../data/payslips";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonLoading,
  useIonToast,
} from "@ionic/react";
import { useParams } from "react-router";
import "./ViewPayslip.css";

function ViewPayslip() {
  const [payslip, setPayslip] = useState<Payslip>();
  const [showLoading, hideLoading] = useIonLoading();
  const [showToast] = useIonToast();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    const payslipData = getPayslip(params.id);
    setPayslip(payslipData);
  });

  const downloadPayslip = useCallback(async () => {
    if (payslip) {
      try {
        await showLoading({
          message: "Payslip is download...",
        });
        const response: Response = await fetch(payslip.file);
        const blob: Blob = await response.blob();
        const base64Data: string = (await convertBlobToBase64(blob)) as string;
        const fileName = payslip.file.split("/").reverse()[0];
        const savedFile: WriteFileResult = await Filesystem.writeFile({
          path: fileName,
          data: base64Data,
          directory: Directory.Data,
        });
        await hideLoading();
        await showToast({
          message: "File has been downloaded and its opening now.",
          duration: 1000,
          position: "bottom",
        });
        await FileOpener.open({
          filePath: savedFile.uri,
        });
      } catch (error: any) {
        await hideLoading();
        await showToast({
          message: error?.message as string,
          duration: 1500,
          position: "bottom",
        });
      }
    }
  }, [payslip]);

  return (
    <IonPage id="view-payslip-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              text={payslip?.id}
              defaultHref="/home"
            ></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {payslip ? (
          <>
            <IonItem>
              <IonLabel className="text-wrap">
                <h2>From:</h2>{" "}
                <IonNote className="detail">
                  {payslip.fromDate.toDateString()}
                </IonNote>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel className="text-wrap">
                <h2>To:</h2>{" "}
                <IonNote className="detail">
                  {payslip.toDate.toDateString()}
                </IonNote>
              </IonLabel>
            </IonItem>
            <IonButton onClick={downloadPayslip} className="download-btn">
              Download Payslip
            </IonButton>
          </>
        ) : (
          <div>Payslip not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewPayslip;
