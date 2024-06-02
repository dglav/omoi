import { useEffect, useState } from "react";

import { tagMap } from "./tagMap";
import { useGetCustomTags } from "../../../../../../hooks/customTagHooks/useGetCustomTags";

const defaultTags = Object.entries(tagMap).reduce(
  (tagLists, [key, value]) => {
    if (value.category === "personal") {
      tagLists.personal = tagLists.personal.concat([
        { value: key, text: value.text },
      ]);
    }
    if (value.category === "relationship") {
      tagLists.relationship = tagLists.relationship.concat([
        { value: key, text: value.text },
      ]);
    }
    if (value.category === "happenings") {
      tagLists.happenings = tagLists.happenings.concat([
        { value: key, text: value.text },
      ]);
    }
    if (value.category === "other") {
      tagLists.other = tagLists.other.concat([
        { value: key, text: value.text },
      ]);
    }
    return tagLists;
  },
  {
    personal: [],
    relationship: [],
    happenings: [],
    other: [],
  } as {
    personal: { value: string; text: string }[];
    relationship: { value: string; text: string }[];
    happenings: { value: string; text: string }[];
    other: { value: string; text: string }[];
  },
);

export const useGetTags = () => {
  const [tags, setTags] = useState(defaultTags);
  const { data: customTags } = useGetCustomTags();

  useEffect(() => {
    if (customTags) {
      const formattedCustomTags = customTags.map((customTag) => ({
        value: customTag.name,
        text: customTag.name,
      }));

      tags.other.push(...formattedCustomTags);

      setTags(tags);
    }
  }, [customTags]);

  return tags;
};
