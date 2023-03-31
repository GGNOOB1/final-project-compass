export function calculatePricePost(orderPart, currentPart, serviceFeeValue) {
  const orderQtd = orderPart.qtd;
  const currentQtd = currentPart.qtd;
  const quantityLeft = currentQtd - orderQtd;
  const priceProduct = parseFloat(currentPart.unitPrice);
  const serviceFee = serviceFeeValue;
  const totalPriceWithoutFee = orderQtd * priceProduct;
  const totalPriceRight =
    totalPriceWithoutFee - totalPriceWithoutFee * (serviceFee / 100);

  return {
    totalPriceRight,
    quantityLeft,
    orderQtd,
  };
}
