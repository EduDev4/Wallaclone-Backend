const User = require('../models/User');
const { sendEmailNotification } = require('../lib/coteConfLib');

exports.sendUsersWithFavNotify = (advert, priceNow, mode = 'state') => {
  const arrayMap = Array.from(advert.isFavBy.entries()).filter(data => data[1]);

  const usersToNotify = [];
  arrayMap.forEach(async data => {
    const { email } = await User.findById(data[0]);
    usersToNotify.push(email);
    if (usersToNotify.length === arrayMap.length) {
      // console.log(usersToNotify);
      sendEmailNotification(
        { toUser: usersToNotify },
        mode !== 'price'
          ? `${advert.name} has changed state: ${advert.state.toUpperCase()}!`
          : `${advert.name} has changed price: BEFORE ${advert.price}€ => NOW ${priceNow}€!`,
        `/adverts/view/${advert._id}`,
      );
    }
  });
};
