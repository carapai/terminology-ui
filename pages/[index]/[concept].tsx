import { useRouter } from "next/router";
import TerminologyDetails from "../../components/TerminologyDetails";
import TerminologyForm from "../../components/TerminologyForm";

export default function Concept() {
  const router = useRouter();
  const { concept, index } = router.query;
  return (
    <>
      {concept === "form" ? (
        <TerminologyForm index={Array.isArray(index) ? index[0] : index} />
      ) : (
        <TerminologyDetails
          id={Array.isArray(concept) ? concept[0] : concept}
          index={Array.isArray(index) ? index[0] : index}
        />
      )}
    </>
  );
}
