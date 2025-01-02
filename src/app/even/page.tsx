'use client'

import { useState, useRef } from 'react'
export default function Even() {
	const [evens, setEvens] = useState([
		{
			title: "Nhạc vui vẻ, khai mạc",
			active: false,
			type: "music", // karaoke
			link: "https://res.cloudinary.com/dhmble47x/video/upload/v1735792573/y2mate.com_-_Disfigure_Blank_Melodic_Dubstep_NCS_Copyright_Free_Music_wqmd7n.mp3",
			list: []
		},
		{
			title: "Nhạc nền trò chuyện",
			active: false,
			type: "music", // karaoke
			link: "https://res.cloudinary.com/dhmble47x/video/upload/v1735795438/tomp3.cc_-_Inspiring_cinematic_background_music_Motivational_songs_for_podcast_gikuol.mp3",
			list: []
		},
		{
			title: "Nhạc xổ số",
			active: false,
			type: "music", // karaoke
			link: "https://res.cloudinary.com/dhmble47x/video/upload/v1735795786/y2mate.com_-_Nha%CC%A3c_Xo%CC%82%CC%89_so%CC%82%CC%81_Kie%CC%82%CC%81n_thie%CC%82%CC%81t_mie%CC%82%CC%80n_Ba%CC%86%CC%81c_Ba%CC%89n_kinh_%C4%91ie%CC%82%CC%89n_KHO%CC%82NG_QUA%CC%89NG_CA%CC%81O_p69dbw.mp3",
			list: []
		},
		{
			title: "Nhạc nhẹ trong bữa tiệc",
			active: false,
			type: "music", // karaoke
			link: "https://res.cloudinary.com/dhmble47x/video/upload/v1735798689/y2mate.com_-_Nha%CC%A3c_Kho%CC%82ng_Lo%CC%9B%CC%80i_Hay_Nha%CC%82%CC%81t_Cho_Qua%CC%81n_Cafe_Nha%CC%80_Ha%CC%80ng_whozeu.mp3",
			list: []
		},
		{
			title: "Nhạc sinh nhật",
			active: false,
			type: "music", // karaoke
			link: "https://res.cloudinary.com/dhmble47x/video/upload/v1735798759/y2mate.com_-_KHU%CC%81C_HA%CC%81T_MU%CC%9B%CC%80NG_SINH_NHA%CC%A3%CC%82T_PHAN_%C4%90INH_TU%CC%80NG_OFFICIAL_VIDEO_wc5phd.mp3",
			list: []
		},
	])

	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [musicPaused, setMusicPaused] = useState(false);
	const [volume, setVolume] = useState(1);

	const pauseOrPlay = () => {
		if (audioRef.current && audioRef.current.paused) {
			audioRef.current.play();
			audioRef.current.volume = volume;
			setMusicPaused(false);
		} else if (audioRef.current) {
			audioRef.current.pause();
			setMusicPaused(true);
		}
	}

	const playMusic = (index: number, link: string) => {
		if (link) {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current.currentTime = 0;
				setMusicPaused(true);
			}

			audioRef.current = new Audio(link);
			audioRef.current.play();
			setMusicPaused(false);

			audioRef.current.addEventListener('ended', () => {
				audioRef.current?.play();
			});

			audioRef.current.volume = volume;
		} else {
			if (audioRef.current) audioRef.current.pause();
			setMusicPaused(false);
			audioRef.current = null;
			alert('Không có file nhạc để phát!');
		}

		setEvens((prevEvens) =>
			prevEvens.map((event, idx) => ({
				...event,
				active: idx === index,
			}))
		);

		console.log(evens);

	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = parseFloat(e.target.value);
		setVolume(newVolume);
		if (audioRef.current) {
			audioRef.current.volume = newVolume;
		}
	};


	return (
		<div className="h-[100vh] w-full px-4 py-8 m-auto max-w-[900px] relative">
			{
				evens.map((item, index) => (
					<button
						key={index}
						className="w-full h-16 bg-stone-800 rounded text-xl font-bold mb-1"
						style={{
							...(item.type !== "karaoke" ? {} : { border: "#797979 1px solid" }),
							...(item.active ? { backgroundColor: "rgb(34 197 94 / var(--tw-bg-opacity, 1)" } : {})
						}}
						onClick={() => item.type === "music" && playMusic(index, item.link)}
					>
						{item.title}
					</button>
				))
			}
			<button
				className="w-full h-16 bg-red-500 rounded text-xl font-bold mb-1"
				onClick={() => {
					if (audioRef.current) {
						audioRef.current.pause()
					}
					window.location.replace("https://youtube.com")
				}}
			>
				youtube
			</button>
			{
				audioRef.current ? (<div className="absolute bottom-8 left-0 w-full px-4">
					<div className="pb-6">
						volume
						<input
							type="range"
							min="0"
							max="1"
							step="0.01"
							value={volume}
							onChange={handleVolumeChange}
							className="volume-slider w-full cursor-pointer"
						/>
					</div>
					<button
						className="
						w-full h-16
						bg-green-500
						rounded
						text-xl
						text-black
						font-bold
						mb-1"
						onClick={() => pauseOrPlay()}
					>
						{musicPaused ? "Tiếp tục phát nhạc" : "Dừng phát nhạc"}
					</button>
				</div>) : null
			}
		</div >
	);
}
