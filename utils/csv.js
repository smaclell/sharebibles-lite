import moment from 'moment';

export default function toCsv(locations) {
  let result = 'key,created,status,longitude,latitude,resources\n';
  locations.forEach((location) => {
    result += location.key;
    result += ',';

    result += moment.utc(location.created).toISOString();
    result += ',';

    result += location.status;
    result += ',';

    result += location.longitude;
    result += ',';

    result += location.latitude;
    result += ',';

    result += Object.values(location.resources).reduce((p, { given }) => p + given, 0);
    result += '\n';
  });

  return result;
}
