export interface Payslip {
  id: string;
  fromDate: Date;
  toDate: Date;
  file: string;
}

const payslips: Payslip[] = [
  {
    id: "DEEL1001",
    fromDate: new Date("2023-11-01 01:10:10"),
    toDate: new Date("2023-11-30 23:10:10"),
    file: "https://corsproxy.io/?https://www.tankhapay.com/blog/wp-content/uploads/2023/10/Salary-Slip-pdf.pdf",
  },
  {
    id: "DEEL1002",
    fromDate: new Date("2023-12-01 01:10:10"),
    toDate: new Date("2023-12-31 23:10:10"),
    file: "https://corsproxy.io/?https://www.tankhapay.com/blog/wp-content/uploads/2023/10/Salary-Slip-pdf.pdf",
  },
  {
    id: "DEEL1003",
    fromDate: new Date("2024-01-01 01:10:10"),
    toDate: new Date("2024-01-31 23:10:10"),
    file: "https://corsproxy.io/?https://www.tankhapay.com/blog/wp-content/uploads/2023/10/Salary-Slip-pdf.pdf",
  },
  {
    id: "DEEL1004",
    fromDate: new Date("2024-02-01 01:10:10"),
    toDate: new Date("2024-02-29 23:10:10"),
    file: "https://corsproxy.io/?https://www.tankhapay.com/blog/wp-content/uploads/2023/10/Salary-Slip-pdf.pdf",
  },
];

export const getPayslips = () => payslips;

export const getPayslip = (id: string) => payslips.find((p) => p.id === id);
