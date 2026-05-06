export default () => ({
  amount: "",

  formatAmount() {
    const parsed = parseFloat(this.amount);
    if (!Number.isFinite(parsed) || parsed <= 0) return 0;
    return Math.round(parsed * 100);
  }
});
