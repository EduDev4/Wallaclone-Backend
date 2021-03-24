const User = require('../models/User');
const { sendEmailNotification } = require('../lib/coteConfLib');

exports.sendUsersWithFavNotify = (advert, priceNow, mode = 'state') => {
  const arrayMap = Array.from(advert.isFavBy.entries()).filter(data => data[1]);
  // console.log(arrayMap);

  const usersToNotify = [];
  const getUserToNotify = async () => {
    for (let i = 0; i < arrayMap.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const user = await User.findById(arrayMap[i][0]);
      if (user) {
        usersToNotify.push(user.email);
      }
    }
  };

  getUserToNotify().then(() => {
    console.log('Users to Notify:', usersToNotify);
    sendEmailNotification(
      { toUser: usersToNotify },
      mode !== 'price'
        ? `${advert.name} has changed state: ${advert.state.toUpperCase()}!`
        : `${advert.name} has changed price: BEFORE ${advert.price}€ => NOW ${priceNow}€!`,
      `/adverts/view/${advert._id}`,
    );
  });
};
