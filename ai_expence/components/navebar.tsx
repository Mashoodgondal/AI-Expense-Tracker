import { checkUser } from "@/lib/checkUser"
export default function Navebar() {
    const user = checkUser();
    return <div>Navebar</div>
}