import PayslipListItem from "../components/PayslipListItem";
import { useEffect, useState } from "react";
import { Payslip, getPayslips } from "../data/payslips";
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";

const Home: React.FC = () => {
  const [payslips, setPayslips] = useState<Payslip[]>([]);

  useEffect(() => {
    const pyaslipsData = getPayslips();
    setPayslips(pyaslipsData);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>All Payslips</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">All Payslips</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {payslips.map((p) => (
            <PayslipListItem key={p.id} payslip={p} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
