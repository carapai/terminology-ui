import { useRouter } from "next/router"
import Terminologies from "../../components/Terminologies";

export default function index() {
  const router = useRouter();
  const { index } = router.query;

  return (
    <div>
      <Terminologies index={Array.isArray(index) ? index[0] : index} />
    </div>
  )
}
