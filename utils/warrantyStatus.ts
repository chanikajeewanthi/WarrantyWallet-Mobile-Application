export function getWarrantyStatus(expiryDate: string) {
  const today = new Date();
  const expiry = new Date(expiryDate);

  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      label: "Expired",
      color: "#EF4444",
      daysLeft: 0,
    };
  }

  if (diffDays <= 30) {
    return {
      label: "Expiring Soon",
      color: "#F59E0B",
      daysLeft: diffDays,
    };
  }

  return {
    label: "Active",
    color: "#22C55E",
    daysLeft: diffDays,
  };
}
