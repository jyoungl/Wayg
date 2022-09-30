package com.ssafy.wayg.util;

import org.openkoreantext.processor.OpenKoreanTextProcessorJava;
import org.openkoreantext.processor.phrase_extractor.KoreanPhraseExtractor;
import org.openkoreantext.processor.tokenizer.KoreanTokenizer;
import org.openkoreantext.processor.util.KoreanPos;
import org.springframework.stereotype.Component;
import scala.Enumeration;
import scala.collection.Iterator;
import scala.collection.Seq;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class MorphemeAnalyzer {
	public List<KoreanPhraseExtractor.KoreanPhrase> analyseText(String text){
		Map<String,Integer> result = new HashMap<>();
		CharSequence normalized = OpenKoreanTextProcessorJava.normalize(text);    //정규화
		Seq<KoreanTokenizer.KoreanToken> tokens = OpenKoreanTextProcessorJava.tokenize(normalized);        //토큰화
		return OpenKoreanTextProcessorJava.extractPhrases(tokens, true, false);
	}

	public Map<String, Integer> pickMorpheme(String text) {
		Map<String,Integer> result = new HashMap<>();
		List<KoreanPhraseExtractor.KoreanPhrase> phrases = analyseText(text);

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

	public List<String> pickNouns(String text){
		List<String> result = new ArrayList<>();
		List<KoreanPhraseExtractor.KoreanPhrase> phrases = analyseText(text);

		for (KoreanPhraseExtractor.KoreanPhrase phrase : phrases) {
			Iterator<KoreanTokenizer.KoreanToken> iter = phrase.tokens().iterator();
			while (iter.hasNext()) {
				KoreanTokenizer.KoreanToken token = iter.next();
				if (token.pos() == KoreanPos.Noun()) {
					String val = token.text().trim();
					result.add(val);
				}
			}
		}
		return result;
	}
}