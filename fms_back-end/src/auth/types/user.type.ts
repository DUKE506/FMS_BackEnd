

const userState = {
    재직 : 'WORK',
    휴직 : 'REST',
    퇴사 : 'LEAVE'
} as const;

export type UserState = typeof userState[keyof typeof userState];