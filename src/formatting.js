const padLeadingZeros = (num, size) => {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
};

export const createInvoiceNumber = (numOfInvoices) => {
  const invoiceNumber = `XM${padLeadingZeros(numOfInvoices, 4)}`;
  return invoiceNumber;
};
