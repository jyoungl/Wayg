package com.ssafy.wayg.util;

import org.openkoreantext.processor.OpenKoreanTextProcessorJava;
import org.openkoreantext.processor.phrase_extractor.KoreanPhraseExtractor;
import org.openkoreantext.processor.tokenizer.KoreanTokenizer;
import org.openkoreantext.processor.util.KoreanPos;
import org.springframework.stereotype.Component;
import scala.collection.Iterator;
import scala.collection.Seq;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class MorphemeAnalyzer {
	public Map<String, Integer> analyseText(String text) {
		Map<String,Integer> result = new HashMap<>();
		CharSequence normalized = OpenKoreanTextProcessorJava.normalize(text);    //정규화
		Seq<KoreanTokenizer.KoreanToken> tokens = OpenKoreanTextProcessorJava.tokenize(normalized);        //토큰화
		List<KoreanPhraseExtractor.KoreanPhrase> phrases = OpenKoreanTextProcessorJava.extractPhrases(tokens, true, false);
		for (KoreanPhraseExtractor.KoreanPhrase phrase : phrases) {
			Iterator<KoreanTokenizer.KoreanToken> iter = phrase.tokens().iterator();
			while (iter.hasNext()) {
				KoreanTokenizer.KoreanToken token = iter.next();
				if (token.pos() == KoreanPos.Noun() || token.pos() == KoreanPos.Adjective() || token.pos() == KoreanPos.Verb()) {
					String val = token.text().trim();
					if (val.length() < 2) continue;
					result.put(val, result.getOrDefault(val,0)+1);
				}
			}
		}
		return result;
	}
}