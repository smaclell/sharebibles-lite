import { filterResources } from '../../utils/filters';

describe('utils/filters', () => {
  describe('filterResources', () => {
    const esv = {
      key: 'english_bible_esv',
      summary: 'resource/english_bible_esv',
      language: 'en-us',
      format: 'book',
      translation: 'ESV',
      statuses: ['delivered', 'accepted'],
      startCount: 1,
    };

    const audio = {
      key: 'audio',
      summary: 'resource/audio',
      language: 'en-us',
      format: 'audio',
      statuses: ['accepted'],
      startCount: 1,
    };

    const resources = [esv, audio];

    it('does nothing with nothing selected', () => {
      const selected = {};

      const filtered = filterResources(resources, selected, 'delivered');

      expect(filtered).toEqual({});
    });

    it('does not change output if allowed status', () => {
      const selected = {
        [esv.key]: { given: 1 },
        [audio.key]: { needed: 1 },
      };

      const filtered = filterResources(resources, selected, 'accepted');

      expect(filtered).toEqual({
        [esv.key]: { given: 1 },
        [audio.key]: { needed: 1 },
      });
    });

    it('filters out some resources by status', () => {
      const selected = {
        [esv.key]: { given: 1 },
        [audio.key]: { needed: 1 },
      };

      const filtered = filterResources(resources, selected, 'delivered');

      expect(filtered).toEqual({
        [esv.key]: { given: 1 },
      });
    });

    it('filters out all resources by status', () => {
      const selected = {
        [esv.key]: { given: 1 },
        [audio.key]: { needed: 1 },
      };

      const filtered = filterResources(resources, selected, 'unknown status');

      expect(filtered).toEqual({});
    });
  });
});
