import { filterResources, filterTags } from '../../utils/filters';

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

  describe('filterTags', () => {
    const read = {
      key: 'cannot_read',
      label: 'tag/initial/cannot_read',
      statuses: ['delivered', 'accepted'],
    };

    const christian = {
      key: 'christian',
      label: 'tag/initial/christian',
      statuses: ['accepted'],
    };

    const tags = [read, christian];

    it('does nothing with nothing selected', () => {
      const selected = {};

      const filtered = filterTags(tags, selected, 'delivered');

      expect(filtered).toEqual({});
    });

    it('filters out false tags', () => {
      const selected = {
        [read.key]: false,
        [christian.key]: true,
      };

      const filtered = filterTags(tags, selected, 'accepted');

      expect(filtered).toEqual({
        [christian.key]: true,
      });
    });

    it('does not change output if allowed status', () => {
      const selected = {
        [read.key]: true,
        [christian.key]: true,
      };

      const filtered = filterTags(tags, selected, 'accepted');

      expect(filtered).toEqual({
        [read.key]: true,
        [christian.key]: true,
      });
    });

    it('filters out some tags by status', () => {
      const selected = {
        [read.key]: true,
        [christian.key]: true,
      };

      const filtered = filterTags(tags, selected, 'delivered');

      expect(filtered).toEqual({
        [read.key]: true,
      });
    });

    it('filters out all tags by status', () => {
      const selected = {
        [read.key]: true,
        [christian]: true,
      };

      const filtered = filterTags(tags, selected, 'unknown status');

      expect(filtered).toEqual({});
    });
  });
});
