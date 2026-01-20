export default () => ({
  amount: "",
  // email: "",

  formatAmount() {
    const amountInPence = this.amount * 100;

    return amountInPence ? amountInPence : 0;
  }

  // formURL() {
  //   const link_id = "test_7sY4gBddRbov0mMf229EI00";
  //   const amountInPence = parseInt(this.amount.replace(/\D/g, "")) * 100;
  //   const email = encodeURIComponent(this.email);
  //
  //   return `https://buy.stripe.com/${link_id}?__prefilled_amount=${amountInPence ? amountInPence : 0}&prefilled_email=${email}`;
  // }
});
