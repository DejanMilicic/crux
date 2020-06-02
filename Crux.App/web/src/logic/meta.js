export const meta = [
  {
    key: "tenant",
    icon: "business",
    title: "Organisation",
    plural: "Organisations",
    inputWidth: "xl",
    displayWidth: "sm",
  },
  {
    key: "meeting",
    icon: "meeting_room",
    title: "Meeting",
    plural: "Meetings",
    inputWidth: "xl",
    displayWidth: "sm",
  },
  {
    key: "msg",
    icon: "message",
    title: "Message",
    plural: "Messages",
    inputWidth: "xl",
    displayWidth: "sm",
  },
  {
    key: "user",
    icon: "person",
    title: "User",
    plural: "Users",
    inputWidth: "xl",
    displayWidth: "sm",
  },
  {
    key: "visible",
    icon: "photo_library",
    title: "Media",
    plural: "Media",
    inputWidth: "xl",
    displayWidth: "md",
  },
];

export function metaFind(key) {
  return meta.find((e) => e.key === key);
}
