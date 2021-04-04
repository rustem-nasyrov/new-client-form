<template>
  <div class="form-container" ref="form-container">
    <form @submit.prevent="submit" class="form">
      <h1 class="form__title">Добавление нового клиента</h1>
      <i class="form__info-text">Поля отмеченные * обязательные к заполнению</i>
      <!-- Клиент -->
      <div class="form-group">
        <h3 class="form-group__title">Клиент</h3>
        <label class="form-group-item">
          <span class="form-group-item__label">Фамилия*:</span>
          <input
            class="form-group-item__input"
            :class="{'form-group-item__input--error': $v.lastName.$error}"
            type="text"
            placeholder="Иванов"
            v-model.trim="$v.lastName.$model"
          />
          <span class="form-group-item__error" v-if="$v.lastName.$error">
            Обязательное поле
          </span>
        </label>
        <label class="form-group-item">
          <span class="form-group-item__label">Имя*:</span>
          <input
            class="form-group-item__input"
            :class="{'form-group-item__input--error': $v.firstName.$error}"
            type="text"
            placeholder="Иван"
            v-model.trim="$v.firstName.$model"
          />
          <span class="form-group-item__error" v-if="$v.firstName.$error">
            Обязательное поле
          </span>
        </label>
        <label class="form-group-item">
          <span class="form-group-item__label">Отчество:</span>
          <input
            class="form-group-item__input"
            type="text"
            placeholder="Иванович"
            v-model="patronymic"
          />
        </label>
        <label class="form-group-item">
          <span class="form-group-item__label">Дата рождения*:</span>
          <input
            class="form-group-item__input"
            :class="{'form-group-item__input--error': $v.birthDate.$error}"
            type="date"
            placeholder="Иванов"
            v-model.trim="$v.birthDate.$model"
          />
          <span class="form-group-item__error" v-if="$v.birthDate.$error">
            Обязательное поле
          </span>
        </label>
        <label class="form-group-item">
          <span class="form-group-item__label">Номер телефона*:</span>
          <input
            class="form-group-item__input"
            :class="{'form-group-item__input--error': $v.phone.$error}"
            type="text"
            placeholder="+7 (987) 654 3210"
            v-model="$v.phone.$model"
            @input="formatPhoneNumber"
          />
          <span class="form-group-item__error" v-if="$v.phone.$error">
            Обязательное поле
          </span>
        </label>
        <div class="form-group-item">
          <span class="form-group-item__label">Пол</span>
          <label>
            <input
              type="radio"
              name="gender"
              id="male"
              v-model="gender"
              v-bind:value="'male'"
            />
            <span>Мужской</span>
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              id="female"
              v-model="gender"
              v-bind:value="'female'"
            />
            <span>Женский</span>
          </label>
        </div>
        <div class="form-group-item">
          <label class="form-group-item__label" for="typeOfClient">
            Группа клиентов*:</label
          >
          <select
            class="form-group-item__input"
            :class="{'form-group-item__input--error': $v.typeOfClient.$error}"
            name="typeOfClient"
            id="typeOfClient"
            multiple
            v-model.trim="$v.typeOfClient.$model"
          >
            <option value="vip">VIP</option>
            <option value="problematic">Проблемные</option>
            <option value="OMS">ОМС</option>
          </select>
          <span class="form-group-item__error" v-if="$v.typeOfClient.$error">
            Обязательное поле
          </span>
        </div>
        <div class="form-group-item">
          <label class="form-group-item__label" for="doctor"
            >Лечащий врач:</label
          >
          <select
            class="form-group-item__input"
            name="doctor"
            id="doctor"
            v-model="doctor"
          >
            <option value="" selected disabled>Выбрать</option>
            <option value="dr_ivanov">Иванов</option>
            <option value="dr_zakharov">Захаров</option>
            <option value="dr_chernysheva">Чернышева</option>
          </select>
        </div>
      </div>
      <!-- Адрес -->
      <div class="form-group">
        <h3 class="form-group__title">Адрес</h3>
        <label class="form-group-item">
          <span class="form-group-item__label">Индекс:</span>
          <input
            class="form-group-item__input"
            type="number"
            v-model="postcode"
          />
        </label>
        <label class="form-group-item">
          <span class="form-group-item__label">Страна:</span>
          <input class="form-group-item__input" type="text" v-model="country" />
        </label>
        <label class="form-group-item">
          <span class="form-group-item__label">Область:</span>
          <input class="form-group-item__input" type="text" v-model="region" />
        </label>
        <label class="form-group-item">
          <span class="form-group-item__label">Город*:</span>
          <input
            class="form-group-item__input"
            :class="{'form-group-item__input--error': $v.city.$error}"
            type="text"
            v-model.trim="$v.city.$model"
          />
          <span class="form-group-item__error" v-if="$v.city.$error">
            Обязательное поле
          </span>
        </label>
        <label class="form-group-item">
          <span class="form-group-item__label">Улица:</span>
          <input class="form-group-item__input" type="text" v-model="street" />
        </label>
        <label class="form-group-item">
          <span class="form-group-item__label">Дом:</span>
          <input
            class="form-group-item__input"
            type="text"
            v-model="houseNumber"
          />
        </label>
      </div>
      <!-- Документ -->
      <div class="form-group">
        <h3 class="form-group__title">Документ</h3>
        <div class="form-group-item">
          <label class="form-group-item__label" for="documentType">
            Тип документа*:
          </label>
          <select
            class="form-group-item__input"
            :class="{'form-group-item__input--error': $v.documentType.$error}"
            name="documentType"
            id="documentType"
            v-model.trim="$v.documentType.$model"
          >
            <option value="" selected disabled>Выбрать</option>
            <option v-bind:value="'passport'">Паспорт</option>
            <option v-bind:value="'birthCertificate'">
              Свидетельство о рождении
            </option>
            <option v-bind:value="'driverLicense'">Вод. удостоверение</option>
          </select>
          <span class="form-group-item__error" v-if="$v.documentType.$error">
            Обязательное поле
          </span>
        </div>
        <label class="form-group-item">
          <span class="form-group-item__label">Серия:</span>
          <input
            class="form-group-item__input"
            type="number"
            v-model="series"
          />
        </label>
        <label class="form-group-item">
          <span class="form-group-item__label">Номер:</span>
          <input
            class="form-group-item__input"
            type="number"
            v-model="documentNumber"
          />
        </label>
        <label class="form-group-item">
          <span class="form-group-item__label">Кем выдан:</span>
          <input
            class="form-group-item__input"
            type="text"
            v-model="registrar"
          />
        </label>
        <label class="form-group-item">
          <span class="form-group-item__label">Дата выдачи*:</span>
          <input
            class="form-group-item__input"
            :class="{'form-group-item__input--error': $v.dateOfIssue.$error}"
            type="date"
            v-model.trim="$v.dateOfIssue.$model"
          />
          <span class="form-group-item__error" v-if="$v.dateOfIssue.$error">
            Обязательное поле
          </span>
        </label>
      </div>
      <button
        type="submit"
        ref="submit-button"
        class="form__button form__button--submit"
      >
        Добавить клиента
      </button>
    </form>
  </div>
</template>

<script>
// Валидатор
import { required } from "vuelidate/lib/validators";

export default {
  name: "Form",
  data() {
    return {
      // Клиент
      firstName: "",
      lastName: "",
      patronymic: "",
      birthDate: "",
      phone: "",
      gender: "",
      typeOfClient: [],
      doctor: "",
      // Адрес
      postcode: "",
      country: "",
      region: "",
      city: "",
      street: "",
      houseNumber: "",
      // Документ
      documentType: "",
      series: "",
      documentNumber: "",
      registrar: "",
      dateOfIssue: "",
    };
  },
  methods: {
    submit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        alert("Новый клиент создан");
        window.location.href = '/';
      }
    },
    formatPhoneNumber() {
      const value = this.phone.replace(/\D/g, "").match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/);

      this.phone = !value[2]
        ? value[1]
        : `+${value[1]} (${value[2]}) ${value[3]}-${value[4]}`;
    },
  },
  validations: {
    firstName: { required },
    lastName: { required },
    birthDate: { required },
    phone: { required },
    typeOfClient: { required },
    city: { required },
    documentType: { required },
    dateOfIssue: { required },
  },
};
</script>

<style lang="scss">
@import "./form.scss";
</style>
