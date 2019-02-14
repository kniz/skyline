function BlogBackGrounder(owner) {
	BackGrounder.call(this, owner);
}
BlogBackGrounder.prototype = new BackGrounder();
BlogBackGrounder.prototype.initialize = function() {
	BackGrounder.prototype.initialize.call(this);

	this.getJQObject().css({
		"background-color": "lightpink"
	});
}

function Blog() {
	Project.call(this, "Blog", "http://kniz.tistory.com?hide_menu", "블로그<br/>뭐하고 사나 궁금해요?", 2, true,
		"white", "white",
		"white", "#23d9F0", "rgb(255, 255, 255)",
		new BlogBackGrounder(this));

	var guide = new Menu("가이드", "", "한가지 테마를 두고 강의합니다.");
	this.append(guide);
	{
		guide.append(new Menu(
			"컴퓨터", 
			"http://kniz.tistory.com/category/%EA%B0%80%EC%9D%B4%EB%93%9C/%EC%BB%B4%ED%93%A8%ED%84%B0%EA%B0%80%20%EB%AD%94%EB%8D%B0?hide_menu", 
			"컴퓨터에 잘 모르는 분을 위해<br/>당연하다 싶은 것들이 왜 당연한지 알려줄께요.", 3));
		guide.append(new Menu(
			"C++",
			"http://kniz.tistory.com/category/%EA%B0%80%EC%9D%B4%EB%93%9C/C++%20%EA%B8%B0%EC%B4%88?hide_menu",
			"오직 방문자수를 벌기위한, <br/>C++ 초보자 가이드<br/>중급자라고 생각하는 초보자도 포함됩니다.",
			4
		));
		guide.append(new Menu(
			"BoostPython",
			"http://kniz.tistory.com/category/%EA%B0%80%EC%9D%B4%EB%93%9C/Boost%20Python%20%EC%BD%94%EB%93%9C%20%EB%B6%84%EC%84%9D?hide_menu",
			"분석이 끝나긴 할것인가.<br/>심심할때마다 할짝할짝 수박 겉핧는 BoostPython 코드 분석",
			3
		));
	}
	
	var review = new Menu("리뷰", "", "물건, 책, 게임, 닥치는 대로 리뷰.");
	this.append(review);
	{
		review.append(new Menu(
			"책", 
			"http://kniz.tistory.com/category/%EB%A6%AC%EB%B7%B0/%EC%B1%85?hide_menu",
			"지극히 주관적이며 이상한 책 리뷰"));
		review.append(new Menu(
			"물건",
			"http://kniz.tistory.com/category/%EB%A6%AC%EB%B7%B0/%EB%AC%BC%EA%B1%B4?hide_menu",
			"사실 상 지름 목록 입니다."
		));
		review.append(new Menu(
			"게임",
			"http://kniz.tistory.com/category/%EB%A6%AC%EB%B7%B0/%EA%B2%8C%EC%9E%84?hide_menu",
			"매우 편향적이며 편식적인 게임 리뷰"
		));
	}
}
Blog.prototype = new Project();