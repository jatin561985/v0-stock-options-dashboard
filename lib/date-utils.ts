export function getUpcomingExpiries(index: 'NIFTY' | 'SENSEX', weeks = 6): string[] {
  const expiries: string[] = [];
  const today = new Date();
  let date = new Date(today);
  const expiryDay = index === 'NIFTY' ? 2 : 4;
  const currentDay = date.getDay();
  let daysUntilExpiry = expiryDay - currentDay;
  if (daysUntilExpiry < 0) {
    daysUntilExpiry += 7;
  } else if (daysUntilExpiry === 0) {
    const now = new Date();
    const istHours = (now.getUTCHours() + 5.5) % 24;
    if (istHours >= 16) {
      daysUntilExpiry = 7;
    }
  }
  date.setDate(date.getDate() + daysUntilExpiry);
  for (let i = 0; i < weeks; i++) {
    const formatted = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).toUpperCase().replace(/ /g, '-');
    expiries.push(formatted);
    date.setDate(date.getDate() + 7);
  }
  return expiries;
}
