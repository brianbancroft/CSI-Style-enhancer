import React, { useState } from "react";
import { Box, Layer } from "grommet";
import styled from "styled-components";

import Image from "./Image";

const LayoutContainer = styled("main")`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #666;
`;

const Layout = styled("section")`
  width: 90vw;
  max-width: 960px;
  height: 90vh;
  background: white;
  box-shadow: 1px 2px 8px blue, 4px 4px 12px green;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

var SpeechRecognition =
  SpeechRecognition ||
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;
var SpeechGrammarList =
  SpeechGrammarList ||
  window.SpeechGrammarList ||
  window.webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent ||
  window.SpeechRecognitionEvent ||
  window.webkitSpeechRecognitionEvent;

const App = () => {
  const [enhanceLevel, setEnhanceLevel] = useState(0);

  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(["enhance"], 1);
  recognition.grammars = speechRecognitionList;
  //recognition.continuous = false;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = function(event) {
    setEnhanceLevel(enhanceLevel + 1);

    console.log("event -> ", event);
    console.log("Confidence: " + event.results[0][0].confidence);
  };

  recognition.onspeechend = async function() {
    await recognition.stop();
    // recognition.start();
  };

  recognition.onnomatch = function(event) {
    alert("Captured but no match");
  };

  recognition.start();

  return (
    <LayoutContainer>
      <Layout>
        <h2>CSI Image Enhancer</h2>
        <Image enhanceLevel={enhanceLevel} />
      </Layout>
    </LayoutContainer>
  );
};

export default App;
