exp publish --release-channel prod-v32 --non-interactive
exp build:android --release-channel prod-v32 --non-interactive --no-publish
exp build:ios --release-channel prod-v32 --non-interactive --no-publish

curl -o /personal/lite-secrets/releases/sb.1.3.0.apk "$(exp url:apk --non-interactive)"
curl -o /personal/lite-secrets/releases/sb.1.3.0.ipa "$(exp url:ipa --non-interactive)"

