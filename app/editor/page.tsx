import React from "react";
import ModernEditor from "./Advanced-editor";
import SummaryEditor from "./SummaryEditor";

export default function Page() {
  return (
    <div>
      <ModernEditor />
      {/* <SummaryEditor /> */}
    </div>
  );
}

// app/page.tsx - Main page combining everything
// "use client";

// import { useState } from "react";
// import SummaryEditor from "./SummaryEditor";
// import DisplaySummary from "./DisplaySummary";
// import { Button } from "@/components/ui/button";

// export default function Home() {
//   const [sharedContent, setSharedContent] = useState("");

//   return (
//     <div className="container mx-auto p-6 space-y-8">
//       <div>
//         <Button
//           onClick={() => {
//             // console.log(data);
//           }}
//         >
//           clci
//         </Button>
//         <h2 className="text-2xl font-bold mb-4">✏️ Create Your Summary</h2>
//         <SummaryEditor
//           onSave={(content) => {
//             console.log("Saved: well waalai", content);
//           }}
//         />
//       </div>

//       <div className="border-t pt-8">
//         <h2 className="text-2xl font-bold mb-4">
//           📄 Display Summary (Another Section)
//         </h2>
//         <DisplaySummary source="localStorage" />
//       </div>
//     </div>
//   );
// }
