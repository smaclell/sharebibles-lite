exp publish --release-channel test-v3 --non-interactive
exp build:android --release-channel test-v3 --non-interactive --no-publish
exp build:ios --release-channel test-v3 --non-interactive --no-publish

curl -o /personal/lite-secrets/releases/sb.0.9.9.apk "$(exp url:apk --non-interactive)"
curl -o /personal/lite-secrets/releases/sb.0.9.9.ipa "$(exp url:ipa --non-interactive)"

