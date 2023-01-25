const Card = (props: { children: React.ReactNode; className: string }) => {
	return <div className={`border-4 rounded-lg ${props.className}`}>{props.children}</div>;
};

export default Card;
