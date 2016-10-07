import Store from '../service/Store';

export default function StartBot() {
  const name = req.params.name;

  Store
    .find(name)
    .then((repository) => {

    })
  ;
}
