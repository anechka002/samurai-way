import type { UsersType } from "@/redux/users-reducer";

export type PostType = {
  id: string;
  img: string;
  message: string;
  likesCount: number;
};
export type MessageType = {
  id: string;
  text: string;
};
export type ProfilePageType = {
  posts: PostType[];
  profile: ProfileType | null;
  status: string
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
  users: UsersType[];
  messages: MessageType[];
};
export type SidebarType = {};
export type RootStateType = {
  profilePage: ProfilePageType;
  dialogsPage: DialogPageType;
  sidebar: SidebarType;
};

export type Inputs = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'