module.exports.calculateService = (order, plan) => {
  let orderServices = order.services
    .filter(service => service.count > 0)
    .map(service => ({
      count: service.count,
      service: service.service,
      days: order.days[0],
    }));

  let allServices = JSON.stringify([
    ...orderServices,
    ...plan.services.map(service => ({
      count: service.count,
      service: service.service,
      days: order.days,
    })),
  ]);

  let result = JSON.parse(allServices).reduce((a, c) => {
    let filtered = a.filter(el => String(el.service) === String(c.service));
    if (filtered.length > 0) {
      a[a.indexOf(filtered[0])].count += +c.count;
    } else {
      a.push(c);
    }
    return a;
  }, []);
  console.log({ result });
  return result;
};
