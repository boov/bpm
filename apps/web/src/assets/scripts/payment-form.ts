export default () => ({
  amount: "",
  // email: "",

  formatAmount() {
    const amountInCents = parseInt(this.amount.replace(/\D/g, "")) * 100;

    return amountInCents ? amountInCents : 0;
  }

  // formURL() {
  //   const link_id = "test_7sY4gBddRbov0mMf229EI00";
  //   const amountInCents = parseInt(this.amount.replace(/\D/g, "")) * 100;
  //   const email = encodeURIComponent(this.email);
  //
  //   return `https://buy.stripe.com/${link_id}?__prefilled_amount=${amountInCents ? amountInCents : 0}&prefilled_email=${email}`;
  // }
});
