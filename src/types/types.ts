export type PostType = {
  id: string;
  img: string;
  message: string;
  likesCount: number;
};
export type UserType = {
  id: number;
  name: string;
};
export type MessageType = {
  id: string;
  text: string;
};
export type ProfilePageType = {
  posts: PostType[];
  newPostText: string;
  profile: ProfileType | null;
};
export type ProfileType = {
  aboutMe: string;
  contacts: Contacts;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  userId: number;
  photos: Photos;
}
type Contacts = {
  facebook: string;
  website: null | string;
  vk: string;
  twitter: string;
  instagram: string;
  youtube: null | string;
  github: string;
  mainLink: null | string;
}
type Photos = {
  small: string;
  large: string;
}
export type DialogPageType = {
  users: UserType[];
  messages: MessageType[];
  newMessage: string;
};
export type SidebarType = {};
export type RootStateType = {
  profilePage: ProfilePageType;
  dialogsPage: DialogPageType;
  sidebar: SidebarType;
};