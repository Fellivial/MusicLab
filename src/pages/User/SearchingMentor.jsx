import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { CardMentor } from "../../components/Card";
import { Input } from "../../components/Input";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
import axios from "axios";
import Button from "../../components/Button";
import { useNavigate } from "react-router";

const SearchingMentor = () => {
  const [mentor, setMentor] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [filterInstrument, setFilterInstrument] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(20);
  const navigate = useNavigate();

  const fetchDataMentors = (page) => {
    setLoading(true);
    axios
      .get(`mentors?limit=12&page=${page}`)
      .then((res) => {
        const { data } = res.data;
        setMentor(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const nextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    fetchDataMentors(newPage);
  };

  const prevPage = () => {
    const newPage = page - 1;
    setPage(newPage);
    fetchDataMentors(newPage);
  };

  useEffect(() => {
    fetchDataMentors(1);
  }, []);

  useEffect(() => {
    setFiltered(
      mentor.filter((item) =>
        item.name?.toLowerCase().includes(searchText.toLowerCase())
      )
    );

    setFilterInstrument(
      mentor.filter((item) =>
        item.instrument_name?.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, mentor]);

  return (
    <Layout>
      <div className="container mx-auto p-9">
        <div className="flex flex-col lg:flex-row space-x-32 p-7">
          <div className="mt-10">
            <div className="flex text-black">
              <p className="font-bold text-black text-2xl">Filter</p>
              <MdKeyboardArrowRight size={25} className="mt-1" />
            </div>
            <div className="flex flex-col space-y-7 mt-7">
              <select
                className="select select-bordered text-slate-600 border-slate-400 bg-select font-semibold font-poppins"
                onChange={(e) => setSearchText(e.target.value)}
              >
                <option defaultValue="">Filter Instrument</option>
                <option value="Vocal">Vocal</option>
                <option value="Piano">Piano</option>
                <option value="Guitar">Guitar</option>
                <option value="Drum">Drum</option>
                <option value="Bass">Bass</option>
                <option value="Harmonika">Harmonika</option>
                <option value="Trombon">Trombon</option>
                <option value="Violin">Violin</option>
              </select>

              <select
                className="select select-bordered text-slate-600 border-slate-400 bg-select font-semibold font-poppins"
                onChange={(e) => setSearchText(e.target.value)}
              >
                <option defaultValue="">Filter Rating</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
          </div>
          <div className="flex-1">
            <div className="form-control w-full -mt-10">
              <Input
                id="search"
                type="text"
                placeholder="Search"
                className="input input-bordered shadow-black shadow-sm bg-white text-black font-poppins"
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className="flex justify-end -mt-8 mr-5 text-black">
              <BiSearchAlt2 size={20} />
            </div>
            <div className="card mt-6">
              <div className="m-5 grid grid-cols-2 gap-3">
                {(searchText !== ""
                  ? filtered.length > 0
                    ? filtered.map((data, index) => (
                        <CardMentor
                          key={index}
                          image={data?.avatar}
                          name={data?.name}
                          desc={data?.about}
                          instagram={data?.instagram}
                          rating={data?.rating}
                          onClick={() => navigate(`/ProfileDetail/${data.id}`)}
                        />
                      ))
                    : filterInstrument.map((data, index) => (
                        <CardMentor
                          key={index}
                          image={data?.avatar}
                          name={data?.name}
                          desc={data?.about}
                          instagram={data?.instagram}
                          instrument_name={data?.instrument_name}
                          rating={data?.rating}
                          onClick={() => navigate(`/ProfileDetail/${data.id}`)}
                        />
                      ))
                  : mentor.map((item, index) => (
                      <CardMentor
                        key={index}
                        image={item?.avatar}
                        name={item?.name}
                        desc={item?.about}
                        instagram={item?.instagram}
                        instrument_name={item?.instrument_name}
                        rating={item?.rating}
                        onClick={() => navigate(`/ProfileDetail/${item.id}`)}
                      />
                    )))}
              </div>
            </div>

            <div className="btn-group mx-auto w-full flex justify-center mt-10">
              <button
                onClick={prevPage}
                disabled={page === 1}
                className="btn"
              >
                «
              </button>
              <button className="btn">{page}</button>
              <button
                onClick={nextPage}
                disabled={page === totalPage}
                className="btn"
              >
                »
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchingMentor;
