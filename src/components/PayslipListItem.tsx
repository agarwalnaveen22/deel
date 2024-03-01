import { IonCard, IonItem, IonLabel, IonNote } from "@ionic/react";
import { Payslip } from "../data/payslips";
import "./PayslipListItem.css";

interface PayslipListItemProps {
  payslip: Payslip;
}

const PayslipListItem: React.FC<PayslipListItemProps> = ({ payslip }) => {
  return (
    <IonCard>
      <IonItem routerLink={`/payslip/${payslip.id}`} detail={true}>
        <div slot="start" className="dot dot-unread"></div>
        <IonLabel className="ion-text-wrap">
          <h2>{payslip.id}</h2>
        </IonLabel>
      </IonItem>
      <IonItem className="row">
        <IonLabel>{payslip.fromDate.toDateString()}</IonLabel>
        <IonLabel slot="end">{payslip.toDate.toDateString()}</IonLabel>
      </IonItem>
    </IonCard>
  );
};

export default PayslipListItem;
