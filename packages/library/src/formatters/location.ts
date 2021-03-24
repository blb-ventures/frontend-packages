export const formatLocation = (location: any): string => {
  if (!location) {
    return '';
  }

  const cityString = [
    location.city && location.city.name,
    location.city && location.city.state && location.city.state.name,
  ]
    .filter(x => x)
    .join(' - ');

  return [location.street, location.streetNumber, location.district, cityString]
    .filter(x => x)
    .join(', ');
};
