import Swal from "sweetalert2";

const swalInstance = Swal.mixin({
  reverseButtons: true,
  confirmButtonColor: "#F46801",
  showCancelButton: true,
  showClass: {
    popup: "animate__animated animate__fadeIn animate__faster",
  },
  hideClass: {
    popup: "animate__animated animate__fadeOut animate__faster",
  },
});

export default swalInstance;
