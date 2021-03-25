import { useState } from "react"
import axios from "axios"
import jwtDecode from "jwt-decode";

interface LoginUserProps {
    account: string,
    password: string,
}

interface CreateUserProps {
    email: string,
    username: string,
    password: string
}
interface LocationStateData {
    memberId: string,
    username: string,
    jwtString?: string,
    editMode?: boolean,

}

interface UpdateUserProps {
    //什麼狀態　做什麼事
    // 資料流　狀態流
    fileData: File | undefined,
    description: string | undefined | null,
    username: string | undefined,
    location: LocationStateData,
    userId: string
}

interface UserData {
    description: null | string,
    id: string,
    picture_url: string
    username: string
}

export const useUser = () => {
    //下次不要這樣包...
    //下次errorCode 可以考慮用 Return 的方式取得 不然render 太多次了
    const [axiosStatus, setAxiosStatus] = useState("idle")
    const [axiosUserData, setAxiosUserData] = useState<LocationStateData>()
    const [errorCode, setErrorCode] = useState("")
    const [message, setMessage] = useState("")
    const [userData, setUserData] = useState<UserData>()
    const [axiosUserListData, setAxiosUserListData] = useState<UserData[]>()


    return {
        axiosUserListData,
        axiosStatus,
        axiosUserData,
        errorCode,
        message,
        userData,
        axiosLoginAccount: ({ account, password }: LoginUserProps) => {
            const axiosLogin = async () => {
                setAxiosStatus("loading")
                const res = axios.post("https://api.weblab.tw/v1/auth/general-login", {
                    appId: "weblab",
                    account: account,
                    password: password
                })
                return res
            }
            axiosLogin()
                .then((res) => {
                    setMessage(res.data.message)
                    const jwtString = res.data.result.authToken
                    const decoded: LocationStateData = jwtDecode(res.data.result.authToken)
                    const locationState = {
                        memberId: decoded?.memberId,
                        jwtString: jwtString,
                        username: decoded?.username
                    }
                    return locationState
                })
                .then((res) => {
                    setAxiosUserData({ ...res })
                })
                .then((res) => {
                    setAxiosStatus("success")
                })
                .then(() => {
                    setErrorCode("success no error")
                })
                .catch((err) => {
                    setAxiosStatus("error")
                    setErrorCode(err)
                })

        },
        axiosCreateAccount: ({ email, username, password }: CreateUserProps) => {
            const axiosCreate = async () => {
                setAxiosStatus("loading")
                const res = axios.post("https://api.weblab.tw/v1/auth/register", {
                    appId: "weblab",
                    email: email,
                    username: username,
                    password: password
                })
                return res
            }
            axiosCreate()
                .then((res) => {
                    setMessage(res.data.message)
                    const jwtString = res.data.result.authToken
                    const decoded: LocationStateData = jwtDecode(res.data.result.authToken)
                    const locationState = {
                        memberId: decoded?.memberId,
                        jwtString: jwtString,
                        username: decoded?.username
                    }
                    return locationState
                })
                .then((res) => {
                    setAxiosUserData(res)
                })
                .then((res) => {
                    setAxiosStatus("success")
                })
                .then(() => {
                    setErrorCode("success no error")
                })
                .catch((err) => {
                    setAxiosStatus("error")
                    setErrorCode(err)
                })
        },
        axiosUpdateAccount: async ({ fileData, description, username, location, userId }: UpdateUserProps) => {

            const getReadAsDataURL = (file: any) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.addEventListener('load', () => {
                        resolve(reader.result);
                    });
                    reader.readAsDataURL(file);
                })
            }
            const dataUrl: any = fileData === undefined ? null : await getReadAsDataURL(fileData)


            const axiosUpdate = async (arrayBuffer: any) => {

                const res = axios.post(`https://weblab-react-special-midtern.herokuapp.com/v1/users/${userId}`, {
                    username: username,
                    description: description,
                    pictureUrl: arrayBuffer
                }, {
                    headers: {
                        Authorization: `Bearer ${location.jwtString} `
                    },
                })
                return res
            }
            axiosUpdate(dataUrl)
                .then((res) => {
                    setMessage(res.data.message)
                    const memberId = res.data.result.id
                    const username = res.data.result.username
                    setAxiosUserData({ ...axiosUserData, memberId: memberId, username: username })
                })
                .then((res) => {
                    setAxiosStatus("success")
                })
                .then(() => {
                    setErrorCode("success no error")
                })
                .catch((err) => {
                    setAxiosStatus("error")
                    setErrorCode(err)
                })
        },
        axiosGetSingleUserData: (userId: string) => {
            const axiosGetSignUser = async () => {
                setAxiosStatus("loading")
                const res = await axios.get(`https://weblab-react-special-midtern.herokuapp.com/v1/users/${userId}`)
                return res
            }
            axiosGetSignUser()
                .then((res) => {
                    setMessage(res.data.message)
                    return res
                })
                .then((res) => {
                    setUserData(res.data.result)
                    setAxiosStatus("success")
                })
                .then(() => {
                    setErrorCode("success no error")
                })
                .catch((err) => {
                    setAxiosStatus("error")
                    setErrorCode(err)
                })
        },
        axiosDeleteUserData: ({ userId, jwtString }: { userId: string, jwtString: string | undefined }) => {
            const axiosDeleteUser = async () => {
                setAxiosStatus("loading")
                const res = await axios.delete(`https://weblab-react-special-midtern.herokuapp.com/v1/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${jwtString} `
                    }
                })
                return res
            }
            axiosDeleteUser()
                .then((res) => {
                    setMessage(res.data.message)
                    setAxiosStatus("success")
                })
                .then(() => {
                    setErrorCode("success no error")
                })
                .catch((err) => {
                    setAxiosStatus("error")
                    setErrorCode(err)
                })

        },
        axiosGetAllUserData: () => {
            setAxiosStatus("loading")
            const axiosGetAllUser = async () => {
                const res = axios.get("https://weblab-react-special-midtern.herokuapp.com/v1/users/")
                return res
            }
            axiosGetAllUser()
                .then((res: any) => {
                    setMessage(res.data.message)
                    setAxiosUserListData(res.data.result)
                }).then(() => {
                    setAxiosStatus("success")

                })
                .then(() => {
                    setErrorCode("success no error")

                })
                .catch((err) => {
                    setAxiosStatus("error")
                    setErrorCode(err)

                })

        }

    }

}