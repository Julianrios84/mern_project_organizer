export const formatterDate = (date) => {
  const d = new Date(date.split('T')[0].split('-'));
  return d.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
